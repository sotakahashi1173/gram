/* eslint-disable */
import type { Prisma, Post, User, Comment, Photo } from "./client";
export default interface PrismaTypes {
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "Photo";
        ListRelations: "Photo";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            Photo: {
                Shape: Photo[];
                Name: "Photo";
                Nullable: false;
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "comment" | "photo" | "post";
        ListRelations: never;
        Relations: {
            comment: {
                Shape: Comment | null;
                Name: "Comment";
                Nullable: true;
            };
            photo: {
                Shape: Photo | null;
                Name: "Photo";
                Nullable: true;
            };
            post: {
                Shape: Post | null;
                Name: "Post";
                Nullable: true;
            };
        };
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Photo: {
        Name: "Photo";
        Shape: Photo;
        Include: Prisma.PhotoInclude;
        Select: Prisma.PhotoSelect;
        OrderBy: Prisma.PhotoOrderByWithRelationInput;
        WhereUnique: Prisma.PhotoWhereUniqueInput;
        Where: Prisma.PhotoWhereInput;
        Create: {};
        Update: {};
        RelationName: "post" | "user";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Name: "Post";
                Nullable: false;
            };
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
}