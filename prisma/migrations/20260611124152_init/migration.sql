/*
  Warnings:

  - A unique constraint covering the columns `[userId,title,comment]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_userId_title_comment_key" ON "Post"("userId", "title", "comment");
