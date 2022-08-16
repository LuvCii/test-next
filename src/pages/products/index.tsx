import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const List = (props: Props) => {
  const { data, error, mutate } = useSWR("/products");
  if (!data) return <div>Loading...</div>;
  async function remove(id: any) {
    if (window.confirm("Delete?")) {
      const url = `http://localhost:3001/products/${id}`;
      await axios.delete(url);
      toast.success("success");
      const newList = data.filter((item: any) => item.id !== id);
      mutate(newList);
    }
  }
  return (
    <div>
      <div className="flex">
        <div className="mx-2 mt-4">
          <Link href="/">
            <a className="px-3 py-2 bg-slate-500 hover:bg-slate-800 text-white">
              Home
            </a>
          </Link>
        </div>
        <div className="mx-2 mt-4">
          <Link href="/products/add">
            <a className="px-3 py-2 bg-slate-500 hover:bg-slate-800 text-white">
              Create Product
            </a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Stt
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any, index: any) => {
                    return (
                      <tr key={item.id} className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.image}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => remove(item.id)}
                            className="hover:bg-red-600 px-2 py-1 hover:text-white mx-1"
                          >
                            Delete
                          </button>
                          <Link href={`/products/edit/${item.id}`}>
                            <a className="hover:bg-yellow-600 px-2 py-1 hover:text-white mx-1">
                              Edit
                            </a>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default List;
