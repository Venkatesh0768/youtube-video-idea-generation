import { relations } from "drizzle-orm/relations";
import { videos, ideas, videoComments } from "./schema";

export const ideasRelations = relations(ideas, ({one}) => ({
	video: one(videos, {
		fields: [ideas.videoId],
		references: [videos.id]
	}),
	videoComment: one(videoComments, {
		fields: [ideas.commentId],
		references: [videoComments.id]
	}),
}));

export const videosRelations = relations(videos, ({many}) => ({
	ideas: many(ideas),
}));

export const videoCommentsRelations = relations(videoComments, ({many}) => ({
	ideas: many(ideas),
}));