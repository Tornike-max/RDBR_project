import axios from "axios";

export const getRealEstates = async () => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    return response.data;
  } catch (error) {
    if (error) {
      console.error(`Server responded with status `);
    }

    throw new Error("Failed to fetch real estates");
  }
};

export const getRealEstate = async (id: string) => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    return response.data;
  } catch (error) {
    if (error) {
      console.error(`Server responded with status `);
    }

    throw new Error("Failed to fetch real estates");
  }
};

export const getRegions = async () => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(
      `https://api.real-estate-manager.redberryinternship.ge/api/regions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    return response.data;
  } catch (error) {
    if (error) {
      console.error(`Server responded with status `);
    }

    throw new Error("Failed to fetch real estates");
  }
};
