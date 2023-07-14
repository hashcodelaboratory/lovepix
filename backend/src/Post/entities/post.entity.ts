import { Post as PostModel } from '@prisma/client';
import type { User } from '@prisma/client';
import type { Comment } from '@prisma/client';

export class PostEntity implements PostModel {
    id: string;
    slug: string;
    title: string;
    body: string;
    authorId: string;
    author: User;
    comments: Comment[];
}