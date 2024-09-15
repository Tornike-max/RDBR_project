import axios from "axios";
import { CreateAgentInterface, CreateListingInterface } from "../types/types";

export const getRealEstates = async (
  getPrice: string,
  getRegion: string,
  getArea: string,
  getBedroom: string
) => {
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
        params: {
          getArea,
          getPrice,
          getRegion,
          getBedroom,
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
      `https://api.real-estate-manager.redberryinternship.ge/api/regions`
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

export const getCities = async () => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(
      `https://api.real-estate-manager.redberryinternship.ge/api/cities`
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

export const createRealEstate = async (data: CreateListingInterface) => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.post(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Failed to store listing. Unexpected response status: ${response.status}`
      );
    }

    if (!response.data) {
      throw new Error("Failed to store listing");
    }

    return response.data;
  } catch (error) {
    if (error) {
      console.error(`Server responded with status `);
    }

    throw new Error("Failed to store real estate");
  }
};

export const deleteRealEstate = async (id: string) => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.delete(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Failed to delete listing. Unexpected response status: ${response.status}`
      );
    }

    if (!response.data) {
      throw new Error(
        "Failed to delete listing. No data received from the server."
      );
    }

    return response.data;
  } catch (error) {
    if (error) {
      console.error(`Server responded with status `);
    }

    throw new Error("Failed to fetch real estates");
  }
};

//agents
export const getAgents = async () => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
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

export const createAgent = async (data: CreateAgentInterface) => {
  try {
    const token = "9cfe8615-1d3a-4d54-9f34-2b6834ccd68e";

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.post(
      `https://api.real-estate-manager.redberryinternship.ge/api/agents`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Failed to store agent. Unexpected response status: ${response.status}`
      );
    }

    if (!response.data) {
      throw new Error("Failed to store agent");
    }

    return response.data;
  } catch (error) {
    if (error) {
      console.error(`Server responded with status `);
    }

    throw new Error("Failed to store agent");
  }
};
