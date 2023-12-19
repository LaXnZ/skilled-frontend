import ImageUpload from "../../../components/ImageUpload";
import { categories } from "../../../utils/categories";
import { ADD_GIG_ROUTE } from "../../../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function CreateGigs() {
  const [cookies] = useCookies();
  const router = useRouter();
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName = "mb-2 text-lg font-medium text-gray-900  ";
  const [files, setFile] = useState([]);
  const [features, setfeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    time: 0,
    revisions: 0,
    feature: "",
    price: 0,
    shortDesc: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
    time: "",
    revisions: "",
    feature: "",
    price: "",
    shortDesc: "",
  });

  const removeFeature = (index) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setfeatures(clonedFeatures);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const addFeature = () => {
    if (data.feature) {
      setfeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };
  const addGig = async () => {
    const { category, description, price, revisions, time, title, shortDesc } =
      data;
    if (
      category &&
      description &&
      title &&
      features.length &&
      files.length &&
      price > 0 &&
      shortDesc.length &&
      revisions > 0 &&
      time > 0
    ) {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const gigData = {
        title,
        description,
        category,
        features,
        price,
        revisions,
        time,
        shortDesc,
      };
      const response = await axios.post(ADD_GIG_ROUTE, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.jwt}`,
        },
        params: gigData,
      });
      console.log(response);
      if (response.status === 201) {
        router.push("/seller/gigs");
      }
    } else {
      const validationErrors = {
        title: "",
        category: "",
        description: "",
        time: "",
        revisions: "",
        feature: "",
        price: "",
        shortDesc: "",
      };

      if (!title || title.trim() === "") {
        validationErrors.title = "Title is required.";
      }

      if (!category || category === "Choose a Category") {
        validationErrors.category = "Category is required.";
      }

      if (!description || description.trim() === "") {
        validationErrors.description = "Description is required.";
      }

      if (isNaN(time) || time <= 0) {
        validationErrors.time = "Delivery time should start from one day.";
      }

      if (isNaN(revisions) || revisions <= 0) {
        validationErrors.revisions = "Can be more than one revision.";
      }

      if (features.length === 0) {
        validationErrors.feature = "At least one feature is required.";
      }

      if (files.length === 0) {
        validationErrors.file = "At least one image is required.";
      }

      if (isNaN(price) || price <= 0) {
        validationErrors.price = "Price is required.";
      }

      if (!shortDesc || shortDesc.trim() === "") {
        validationErrors.shortDesc = "Short description is required.";
      }

      if (Object.values(validationErrors).some((error) => error !== "")) {
        setErrors(validationErrors);
        return;
      }
    }
  };
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h1 className="text-6xl text-gray-900 mb-5">Create a new Gig</h1>
      <h3 className="text-3xl text-gray-900 mb-5">
        Enter the details to create the gig
      </h3>
      <form action="" className="flex flex-col gap-5 mt-10">
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="title" className={labelClassName}>
              Gig Title
            </label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              type="text"
              id="title"
              className={inputClassName}
              placeholder="e.g. I will do something I'm really good at"
              required
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="categories" className={labelClassName}>
              Select a Category
            </label>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              name="category"
              onChange={handleChange}
              defaultValue="Choose a Category"
            >
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className={labelClassName}>
            Gig Description
          </label>
          <textarea
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a short description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="delivery" className={labelClassName}>
              Delivery Time
            </label>
            <input
              type="number"
              className={inputClassName}
              id="delivery"
              name="time"
              value={data.time}
              onChange={handleChange}
              placeholder="Minimum Delivery Time in Days"
            />
            {errors.time && <p className="text-red-500">{errors.time}</p>}
          </div>
          <div>
            <label htmlFor="revision" className={labelClassName}>
              Revisions
            </label>
            <input
              type="number"
              id="revision"
              className={inputClassName}
              placeholder="Max Number of Revisions"
              name="revisions"
              value={data.revisions}
              onChange={handleChange}
            />
            {errors.revisions && (
              <p className="text-red-500">{errors.revisions}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="features" className={labelClassName}>
              Features
            </label>
            <div className="flex gap-3 items-center mb-5">
              <input
                type="text"
                id="features"
                className={inputClassName}
                placeholder="Enter a Feature Name"
                name="feature"
                value={data.feature}
                onChange={handleChange}
              />
              {errors.feature && (
                <p className="text-red-500">{errors.feature}</p>
              )}

              <button
                type="button"
                className="focus:outline-none text-white bg-sky-500 hover:bg-sky-400 font-medium  text-lg px-10 py-3 rounded-md "
                onClick={addFeature}
              >
                Add
              </button>
            </div>
            <ul className="flex gap-2 flex-wrap">
              {features.map((feature, index) => {
                return (
                  <li
                    key={feature + index.toString()}
                    className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                  >
                    <span>{feature}</span>
                    <span
                      className="text-red-700"
                      onClick={() => removeFeature(index)}
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <label htmlFor="image" className={labelClassName}>
              Gig Images
           
         
            </label>

            <div>
                {errors.file && <p className="text-red-500">{errors.file}</p>}
              <ImageUpload files={files} setFile={setFile} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="shortDesc" className={labelClassName}>
              Short Description
            </label>
            <input
              type="text"
              className={`${inputClassName} w-1/5`}
              id="shortDesc"
              placeholder="Enter a short description."
              name="shortDesc"
              value={data.shortDesc}
              onChange={handleChange}
            />
            {errors.shortDesc && (
              <p className="text-red-500">{errors.shortDesc}</p>
            )}
          </div>
          <div>
            <label htmlFor="price" className={labelClassName}>
              Gig Price ( LKR )
            </label>
            <input
              type="number"
              className={`${inputClassName} w-1/5`}
              id="price"
              placeholder="Enter a price"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
        </div>
        <div>
          <button
            className="border   text-lg font-semibold px-5 py-3  bg-sky-500 hover:bg-sky-400 text-white rounded-md"
            type="button"
            onClick={addGig}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGigs;
