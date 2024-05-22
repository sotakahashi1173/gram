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
        RelationName: "Photo";
        ListRelations: "Photo";
        Relations: {
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
        Include: never;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: never;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
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
        RelationName: "post";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Name: "Post";
                Nullable: false;
            };
        };
    };
}