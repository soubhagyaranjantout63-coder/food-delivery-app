import { useState } from "react";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("auth"));

  const [name, setName] = useState(storedUser?.name || "");
  const [phone, setPhone] = useState(storedUser?.phone || "");
  const [address, setAddress] = useState(storedUser?.address || "");

  const handleSave = async () => {
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ name, phone, address })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("auth", JSON.stringify(data));
      alert("Profile Updated Successfully");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-96">

        <h2 className="text-2xl mb-6 text-orange-400">Edit Profile</h2>

        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-700 rounded"
        />

        <input
          type="text"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-700 rounded"
        />

        <textarea
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-700 rounded"
        />

        <button
          onClick={handleSave}
          className="w-full bg-orange-500 py-2 rounded"
        >
          Save
        </button>

      </div>
    </div>
  );
};

export default UserProfile;