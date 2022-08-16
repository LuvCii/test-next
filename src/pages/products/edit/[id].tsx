import axios from "axios";
import Router, { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useSWR, { mutate } from "swr";
import "react-toastify/dist/ReactToastify.css";

type ProProps = {
    name: string,
    image: string,
    price: number,
    description: string
};

const Edit = () => {
    const router = useRouter()
    const {id} = router.query
    const {data, error} = useSWR(id? `/products/${id}`: null)
    console.log(data);
    
    if(!data){
        (async(id:any)=>{
            const {data} = await axios.get(`http://localhost:3001/products/${id}`)
            reset(data)
        })(id)
    }
    const create = async(item: ProProps)=>{
        const newPro = await axios.put(`http://localhost:3001/products/${id}`, item)
        mutate(newPro)
    }
    const {reset, register, handleSubmit, formState:{errors}} = useForm<ProProps>()
    const onSubmit:SubmitHandler<ProProps> = async(product)=>{
        await create(product)
        toast.success("Edit Success")
        setTimeout(() => {
            Router.push('/products')
        }, 2000);
    }
  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Name
              </label>
              <input
              {...register('name', {required:true})}
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <p className="text-red-600">
                {errors.name?.type === 'required' && 'Vui lòng điền trường này'}
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Image
              </label>
              <input
              {...register('image', {required:true})}
                type="text"
                placeholder="image"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <p className="text-red-600">
                {errors.image?.type === 'required' && 'Vui lòng điền trường này'}
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="subject"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Price
              </label>
              <input
              {...register('price', {required:true})}
                type="number"
                placeholder="price"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <p className="text-red-600">
                {errors.price?.type === 'required' && 'Vui lòng điền trường này'}
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Message
              </label>
              <textarea
              {...register('description', {required:true})}
                rows="4"
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
              <p className="text-red-600">
                {errors.description?.type === 'required' && 'Vui lòng điền trường này'}
              </p>
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Edit;
