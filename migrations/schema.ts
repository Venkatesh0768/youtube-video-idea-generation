import { pgTable, uuid, varchar, text, boolean, timestamp, integer, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const crewJobs = pgTable("crew_jobs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: varchar("user_id", { length: 50 }).notNull(),
	kickoffId: text("kickoff_id").notNull(),
	jobState: text("job_state").default('RUNNING').notNull(),
	jobResult: text("job_result"),
	processed: boolean().default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const youtubeChannels = pgTable("youtube_channels", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: varchar("user_id", { length: 50 }).notNull(),
	name: text().notNull(),
	channelId: text("channel_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const videos = pgTable("videos", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: varchar("user_id", { length: 50 }).notNull(),
	videoId: text("video_id").notNull(),
	title: text().notNull(),
	description: text(),
	publishedAt: timestamp("published_at", { mode: 'string' }).notNull(),
	thumbnailUrl: text("thumbnail_url"),
	channelId: text("channel_id").notNull(),
	channelTitle: text("channel_title").notNull(),
	viewCount: integer("view_count").default(0),
	likeCount: integer("like_count").default(0),
	dislikeCount: integer("dislike_count").default(0),
	commentCount: integer("comment_count").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const ideas = pgTable("ideas", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: varchar("user_id", { length: 50 }).notNull(),
	videoId: uuid("video_id").notNull(),
	commentId: uuid("comment_id").notNull(),
	score: integer().default(0),
	videoTitle: text("video_title").notNull(),
	description: text().notNull(),
	research: text().array().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.videoId],
			foreignColumns: [videos.id],
			name: "ideas_video_id_videos_id_fk"
		}),
	foreignKey({
			columns: [table.commentId],
			foreignColumns: [videoComments.id],
			name: "ideas_comment_id_video_comments_id_fk"
		}),
]);

export const videoComments = pgTable("video_comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	videoId: uuid("video_id").notNull(),
	userId: varchar("user_id", { length: 50 }).notNull(),
	commentText: text("comment_text").notNull(),
	likeCount: integer("like_count").default(0),
	dislikeCount: integer("dislike_count").default(0),
	publishedAt: timestamp("published_at", { mode: 'string' }).notNull(),
	isUsed: boolean("is_used").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});
