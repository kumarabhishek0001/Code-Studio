-- CreateTable
CREATE TABLE "Problems" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCases" (
    "id" BIGSERIAL NOT NULL,
    "problem_id" BIGINT NOT NULL,
    "input" TEXT NOT NULL,
    "expected_output" TEXT NOT NULL,
    "is_hidden" BOOLEAN NOT NULL,

    CONSTRAINT "TestCases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCaseResults" (
    "id" BIGSERIAL NOT NULL,
    "test_case_id" BIGINT NOT NULL,
    "submission_key" BIGINT NOT NULL,

    CONSTRAINT "TestCaseResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "problem_id" BIGINT NOT NULL,
    "code" TEXT NOT NULL,
    "language" INTEGER NOT NULL,
    "overall_status" TEXT NOT NULL,
    "runtime_ms" INTEGER,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Problems_title_key" ON "Problems"("title");

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "Problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseResults" ADD CONSTRAINT "TestCaseResults_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "TestCases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseResults" ADD CONSTRAINT "TestCaseResults_submission_key_fkey" FOREIGN KEY ("submission_key") REFERENCES "Submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "Problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
