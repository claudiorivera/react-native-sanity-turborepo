import { useRouter } from "next/router";

import { api } from "~/utils/api";

const Post = () => {
	const { id } = useRouter().query as { id: string };

	const { data } = api.post.byId.useQuery(id);

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Post;
