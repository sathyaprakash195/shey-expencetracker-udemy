"use client";
import PageTitle from "@/components/page-title";
import { UpdateUser } from "@/server-actions/users";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users";
import { Button, Input, Modal, Tag, message } from "antd";
import React from "react";

function Profile() {
  const { loggedInUser, SetLoggedInUser }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;

  const [incomeCategories, setIncomeCategories] = React.useState<string[]>(
    loggedInUser?.incomeCategories || []
  );
  const [expenseCategories, setExpenseCategories] = React.useState<string[]>(
    loggedInUser?.expenseCategories || []
  );
  const [newCategory, setNewCategory] = React.useState<string>("");

  const [showAddNewCategory, setShowAddNewCategory] = React.useState(false);
  const [newCategoryType, setNewCategoryType] = React.useState<
    "income" | "expense"
  >("income");
  const [loading, setLoading] = React.useState(false);

  const getProperty = ({ key, value }: { key: string; value: string }) => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{key}</span>
        <span className="text-sm">{value}</span>
      </div>
    );
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      const updatedUser = await UpdateUser({
        userId: loggedInUser?._id || "",
        payload: {
          incomeCategories,
          expenseCategories,
        },
      });
      message.success("User Profile Updated Successfully");
      SetLoggedInUser(updatedUser);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle title="Profile" />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {getProperty({ key: "Name", value: loggedInUser?.name || "" })}
        {getProperty({ key: "Email", value: loggedInUser?.email || "" })}
        {getProperty({ key: "Username", value: loggedInUser?.username || "" })}
        {getProperty({ key: "Id", value: loggedInUser?._id || "" })}
        {getProperty({
          key: "Joined At",
          value: loggedInUser?.createdAt || "",
        })}
      </div>

      <div className="mt-7">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Income Categories</h1>
          <Button
            size="small"
            onClick={() => {
              setShowAddNewCategory(true);
              setNewCategoryType("income");
            }}
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          {incomeCategories.map((category) => {
            return (
              <Tag
                key={category}
                className="text-sm font-semibold text-primary px-5 py-2 capitalize"
                closable
                onClose={() => {
                  setIncomeCategories(
                    incomeCategories.filter((c) => c !== category)
                  );
                }}
              >
                {category}
              </Tag>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Expense Categories</h1>
          <Button
            size="small"
            onClick={() => {
              setShowAddNewCategory(true);
              setNewCategoryType("expense");
            }}
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          {expenseCategories.map((category) => {
            return (
              <Tag
                key={category}
                className="text-sm font-semibold text-primary px-5 py-2 capitalize"
                closable
                onClose={() => {
                  setExpenseCategories(
                    expenseCategories.filter((c) => c !== category)
                  );
                }}
              >
                {category}
              </Tag>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-7">
        <Button type="primary" onClick={onUpdate} loading={loading}>
          Update User Profile
        </Button>
      </div>

      <Modal
        open={showAddNewCategory}
        title={`Add New ${newCategoryType} Category`}
        centered
        closable
        onCancel={() => setShowAddNewCategory(false)}
        okText="Add"
        onOk={() => {
          if (newCategoryType === "income") {
            setIncomeCategories([...incomeCategories, newCategory]);
          } else {
            setExpenseCategories([...expenseCategories, newCategory]);
          }
          setShowAddNewCategory(false);
        }}
        okButtonProps={{ disabled: !newCategory }}
      >
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category Name"
        />
      </Modal>
    </div>
  );
}

export default Profile;
