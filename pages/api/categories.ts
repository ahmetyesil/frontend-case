import { NextApiRequest, NextApiResponse } from "next";
import categoriesData from "../../assets/items.json";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method === "GET") {
    const { search } = req.query;

    const filteredCategories = search
        ? categoriesData.data.filter((category:string) =>
            category.toLowerCase().includes(typeof search === "string" ? search.toLowerCase() : '')
        )
        : categoriesData.data;

    res.status(200).json(filteredCategories);
  } else {
    res.status(405).end();
  }
}