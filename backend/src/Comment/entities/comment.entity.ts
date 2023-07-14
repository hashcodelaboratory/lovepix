import { Comment as CommentModel } from "@prisma/client";
import type { Post } from "@prisma/client";

export class CommentEntity implements CommentModel {
    id: string;
    comment: string;
    postId: string;
    post: Post;
}