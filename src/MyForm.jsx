import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DevTool } from "@hookform/devtools";

const MAX_FILE_SIZE = 102400; // 100KB

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  dob: Yup.date().required("Date of birth is required"),
  profilePicture: Yup
    .mixed()
    .required("Profile picture is required")
    .test("is-valid-type", "Not a valid image type", value => value && value[0]?.type.includes("image"))
    .test("is-valid-size", "Max allowed size is 100KB", value => value && value[0]?.size <= MAX_FILE_SIZE),
  phones: Yup.array().of(
    Yup.object().shape({
      phoneNumber: Yup.string().required("Phone number is required"),
    })
  ),
});

function MyForm() {
  const { register, handleSubmit, control, formState: { errors, isDirty, dirtyFields }, trigger, reset, setValue } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      phones: [{ phoneNumber: "" }], // Initialize with one empty phone number field
      name:"Deepanshu"
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones", // Name of the field array
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Text Field */}
      <label>Name:</label>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      {/* Email Field */}
      <label>Email:</label>
      <input type="email" {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      {/* Password Field */}
      <label>Password:</label>
      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}

      {/* Checkbox */}
      <label>
        <input type="checkbox" {...register("subscribe")} />
        Subscribe to newsletter
      </label>

      {/* Radio Buttons */}
      <label>Gender:</label>
      <label>
        <input type="radio" {...register("gender")} value="male" />
        Male
      </label>
      <label>
        <input type="radio" {...register("gender")} value="female" />
        Female
      </label>
      {errors.gender && <p>{errors.gender.message}</p>}

      {/* Select Dropdown */}
      <label>Country:</label>
      <select {...register("country")}>
        <option value="">Select your country</option>
        <option value="USA">USA</option>
        <option value="India">India</option>
        <option value="Canada">Canada</option>
      </select>
      {errors.country && <p>{errors.country.message}</p>}

      {/* File Upload */}
      <label>Profile Picture:</label>
      <input
        type="file"
        {...register("profilePicture")}
        multiple
        onChange={(e) => {
          register('profilePicture').onChange(e);
          trigger('profilePicture');
        }}
      />
      {errors.profilePicture && <p>{errors.profilePicture.message}</p>}

      {/* Date Picker */}
      <label>Date of Birth:</label>
      <input type="date" {...register("dob")} />
      {errors.dob && <p>{errors.dob.message}</p>}

      {/* Text Area */}
      <label>Comments:</label>
      <textarea {...register("comments")} placeholder="Your comments here..." />

      {/* Phone Number Fields */}
      <label>Phone Numbers:</label>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`phones[${index}].phoneNumber`}
            control={control}
            defaultValue={item.phoneNumber || ""}
            render={({ field }) => <input {...field} placeholder="Phone Number" />}
          />
          {
            index > 0 && <button type="button" onClick={() => remove(index)}>Remove</button>

          }
             {
          errors.phones && errors.phones[index] && <p>{errors.phones[index].phoneNumber.message}</p>
        }
        </div>
      ))}
      <button type="button" onClick={() => append({ phoneNumber: "" })}>Add Phone</button>
      {errors.phones && <p>{errors.phones.message}</p>}

      {/* Submit Button */}
      <button type="submit">Submit</button>

      {/* Dirty Fields Check */}
      <p>Form is dirty: {isDirty ? "Yes" : "No"}</p>
      <p>Name field dirty: {dirtyFields.name ? "Yes" : "No"}</p>

      {/* React Hook Form DevTools */}
      <DevTool control={control} />
    </form>
  );
}

export default MyForm;
