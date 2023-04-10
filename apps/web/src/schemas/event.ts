export const event = {
	name: "event",
	type: "document",
	title: "Event",
	fields: [
		{
			name: "title",
			type: "string",
			title: "Title",
		},
		{
			name: "location",
			type: "geopoint",
			title: "Location",
		},
		{
			name: "dateTime",
			type: "datetime",
			title: "Date & Time",
		},
		{
			name: "description",
			type: "text",
			title: "Description",
		},
		{
			name: "image",
			type: "image",
			title: "Image",
		},
		{
			name: "cost",
			type: "number",
			title: "Cost",
		},
	],
};
