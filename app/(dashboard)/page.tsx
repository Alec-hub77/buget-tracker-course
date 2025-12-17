import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CreateTransactionDialog } from "./_components/CreateTransactionDialog";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userSettings = await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });
  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap justify-between gap-6 py-8 px-6">
          <p className="text-3xl font-bold">Hello, {user.firstName} 👋</p>
          <div className="flex items-center gap-3">
            <CreateTransactionDialog trigger={<Button variant={"success"}>New income</Button>} type="income" />
            <CreateTransactionDialog trigger={<Button variant={"error"}>New expense</Button>} type="expense" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
