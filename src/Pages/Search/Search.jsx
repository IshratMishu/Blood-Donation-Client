import { useState } from "react";
import { allDistSubDists } from "../../../public/DistrictAndUpazilas";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Search = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    axiosPublic
      .get(
        `/search-user/${data.bloodGroup}?district=${data.district}&upazila=${data.upazila}`
      )
      .then((res) => {
        setSearchResult(res.data);
        // console.log(res.data)
      });
  };

  //
  const districts = Object.keys(districtsAndUpazilas);
  const upazilas = selectedDistrict
    ? districtsAndUpazilas[selectedDistrict]
    : [];
  //

  return (
    <div className="pt-28">
      <form
        action=""
        className="flex mb-5 md:gap-6 gap-2 items-center justify-center md:flex-row flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Blood group  */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            className="select w-full max-w-xs input-bordered "
            defaultValue={"default"}
            {...register("bloodGroup", { required: true })}
            required
          >
            <option disabled value="default">
              Select your Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {errors.bloodGroup && (
            <span className="text-red-600">Blood group is required</span>
          )}
        </div>

        {/* District*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <select
            className="select w-full max-w-xs input-bordered "
            defaultValue={"default"}
            {...register("district", {
              onChange: (e) => {
                setSelectedDistrict(e.target.value);
                // setSelectedUpazila("");
              },
            })}
            required
          >
            <option disabled value="default">
              Select your District
            </option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* upazila*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <select
            className="select w-full max-w-xs input-bordered "
            {...register("upazila")}
            defaultValue={"default"}
            disabled={!selectedDistrict}
            required
          >
            <option disabled value="default">
              Select your Upazila
            </option>
            {upazilas.map((upazila) => (
              <option key={upazila} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <button className="btn px-8 md:mt-8 btn-accent btn-outline">
            Search
          </button>
        </div>
      </form>

      <div className="min-h-screen">
        <div
          className={`overflow-x-auto mt-10 ${
            searchResult.length === 0 && "hidden"
          }`}
        >
          <table className="table table-sm">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>Name</th>
                <th>Address</th>
                <th>Status</th>
                <th>Blood Group</th>
              </tr>
            </thead>

            <tbody>
              {searchResult?.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.avatar}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <th>
                    {user.upazila}, {user.district}
                  </th>
                  <td>{user.status}</td>
                  <td>{user.bloodGroup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Search;
