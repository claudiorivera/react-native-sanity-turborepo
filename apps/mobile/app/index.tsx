import React, { useState } from "react";
import {
	RefreshControl,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Stack, useRouter } from "expo-router";

import { api, type RouterOutputs } from "../src/utils/api";

const PostCard: React.FC<{
	post: RouterOutputs["post"]["all"][number];
	onDelete: () => void;
}> = ({ post, onDelete }) => {
	const router = useRouter();

	return (
		<View className="flex flex-row rounded-lg bg-white/10 p-4">
			<View className="flex-grow">
				<TouchableOpacity onPress={() => router.push(`/posts/${post._id}`)}>
					<Text className="text-xl font-semibold text-pink-400">
						{post.title}
					</Text>
					<Text className="mt-2 text-white">{post.content}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={onDelete}>
				<Text className="font-bold uppercase text-pink-400">Delete</Text>
			</TouchableOpacity>
		</View>
	);
};

const CreatePost: React.FC = () => {
	const utils = api.useContext();

	const [title, setTitle] = React.useState("");
	const [content, setContent] = React.useState("");

	const { mutate, error } = api.post.create.useMutation({
		async onSuccess() {
			setTitle("");
			setContent("");
			await utils.post.all.invalidate();
		},
	});

	return (
		<View className="mt-4">
			<TextInput
				className="mb-2 rounded bg-white/10 p-2 text-white"
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
				value={title}
				onChangeText={setTitle}
				placeholder="Title"
			/>
			{error?.data?.zodError?.fieldErrors.title && (
				<Text className="mb-2 text-red-500">
					{error.data.zodError.fieldErrors.title}
				</Text>
			)}
			<TextInput
				className="mb-2 rounded bg-white/10 p-2 text-white"
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
				value={content}
				onChangeText={setContent}
				placeholder="Content"
			/>
			{error?.data?.zodError?.fieldErrors.content && (
				<Text className="mb-2 text-red-500">
					{error.data.zodError.fieldErrors.content}
				</Text>
			)}
			<TouchableOpacity
				className="rounded bg-pink-400 p-2"
				onPress={() => {
					mutate({
						title,
						content,
					});
				}}
			>
				<Text className="text-center font-semibold text-white">Create</Text>
			</TouchableOpacity>
		</View>
	);
};

const Index = () => {
	const postQuery = api.post.all.useQuery();

	const deletePostMutation = api.post.delete.useMutation({
		onSettled: () => postQuery.refetch(),
	});

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		void postQuery.refetch();
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="bg-[#1F104A]">
			{/* Changes page title visible on the header */}
			<Stack.Screen options={{ title: "Home Page" }} />
			<View className="h-full w-full p-4">
				<FlashList
					data={postQuery.data}
					estimatedItemSize={20}
					ItemSeparatorComponent={() => <View className="h-2" />}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={(p) => (
						<PostCard
							post={p.item}
							onDelete={() => deletePostMutation.mutate(p.item._id)}
						/>
					)}
				/>

				<CreatePost />
			</View>
		</SafeAreaView>
	);
};

export default Index;
