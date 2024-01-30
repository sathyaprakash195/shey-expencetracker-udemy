"use client";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users";
import { Button, Form, Input, Modal, Select, Tag, message } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

function Filters() {
  const [categoriesToShow, setCategoriesToShow] = React.useState<string[]>([]);
  const [showFiltersModal, setShowFiltersModal] = React.useState(false);
  const [form] = Form.useForm();
  const { loggedInUser }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const router = useRouter();
  const [appliedFilters, setAppliedFilters] = React.useState<any>({
    type: "",
    category: "",
    fromDate: "",
    toDate: "",
    sortOrder: "",
  });

  const onFinish = (values: any) => {
    try {
      const searchParams = new URLSearchParams();
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          searchParams.append(key, values[key]);
        }
      });
      setAppliedFilters(values);
      router.push(`/transactions?${searchParams.toString()}`);
      setShowFiltersModal(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onFilterRemove = (key: string) => {
    // cler the filter
    const newFilters = { ...appliedFilters };
    newFilters[key] = "";
    onFinish(newFilters);
    form.setFieldsValue(newFilters);
  };

  let getAppliedFiltersCount = () => {
    let count = 0;
    Object.keys(appliedFilters).forEach((key) => {
      if (appliedFilters[key]) {
        count++;
      }
    });
    return count;
  };

  return (
    <div className="p-5 border border-solid border-gray-200 mt-5">
      <div className="flex justify-between items-center">
        <div>
          {getAppliedFiltersCount() > 0 ? (
            <div className="flex gap-5">
              {Object.keys(appliedFilters).map((key) => {
                if (!appliedFilters[key]) return null;
                return (
                  <div className="flex flex-col capitalize">
                    <span className="text-gray-500 text-xs">{key}</span>
                    <Tag
                      className="px-5 py-1 border border-gray-300 font-semibold mt-1"
                      closable
                      onClose={() => onFilterRemove(key)}
                    >
                      {appliedFilters[key]}
                    </Tag>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="text-sm  text-gray-600">No filters applied</span>
          )}
        </div>

        <div className="flex gap-5 items-center">
          <Button
            type="default"
            onClick={() => {
              onFinish({});
            }}
          >
            Clear
          </Button>
          <Button type="primary" onClick={() => setShowFiltersModal(true)}>
            Apply
          </Button>
        </div>
      </div>

      <Modal
        open={showFiltersModal}
        onCancel={() => setShowFiltersModal(false)}
        okText="Apply"
        centered
        title="Transactions Filters"
        width={800}
        okButtonProps={{
          htmlType: "submit",
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={appliedFilters}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Form.Item name="type" label="Transaction Type">
              <Select
                onChange={(value) => {
                  if (value === "income") {
                    setCategoriesToShow(loggedInUser?.incomeCategories || []);
                  } else {
                    setCategoriesToShow(loggedInUser?.expenseCategories || []);
                  }
                  form.setFieldsValue({ category: "" });
                }}
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="">Select Category</Select.Option>
                {categoriesToShow.map((category) => (
                  <Select.Option value={category}>
                    {category.toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="fromDate" label="Date">
              <Input type="date" />
            </Form.Item>
            <Form.Item name="toDate" label="Date">
              <Input type="date" />
            </Form.Item>

            <Form.Item name="sortOrder" label="Sort Order">
              <Select>
                <Select.Option value="asc">Ascending</Select.Option>
                <Select.Option value="desc">Descending</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Filters;
