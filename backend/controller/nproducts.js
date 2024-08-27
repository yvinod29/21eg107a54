import axios from 'axios';

export const nproducts = async (req, res) => {
  try {
    // Authentication request body
    const authBody = {
         companyName :  "affordmad" ,
         clientID :  "4a0bcca5-b75a-413c-b254-dbb18e848cd9" ,
         clientSecret :  "mrVzgNHMVeGkDpWr" ,
         ownerName :  "Y Vinod Kumar Reddy" ,
         ownerEmail :  "vinodkumarreddyyellannagari@gmail.com" ,
         rollNo :  "21eg107a54" 
      };

    // Step 1: Authenticate and obtain an access token
    const authResponse = await axios.post('http://20.244.56.144/test/auth', authBody);
    console.log(authResponse)

    if ( !authResponse.data.access_token) {
      throw new Error('Failed to authenticate and obtain access token.');
    }

    const token = authResponse.data.access_token; // Extract access token

    // Step 2: Extract query parameters from the incoming request
    const { top, maxPrice, minPrice, } = req.query;

    // Construct the external API URL
    const apiUrl = `http://20.244.56.144/test/companies/MYN/categories/Laptop/products?top=${top}&maxPrice=${maxPrice}&minPrice=${minPrice}`;

    // Step 3: Make an Axios request to the external API with Authorization header
    const response = await axios.get(apiUrl, {
      params: {
        top,
        maxPrice,
        minPrice,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Step 4: Send the response from the external API back to the frontend
    res.status(200).json({
      message: 'Successful',
      data: response.data,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
