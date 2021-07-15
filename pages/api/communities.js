import { SiteClient } from "datocms-client";

export default async function takerRequests(req, res) {
  if (req.method === "POST") {
    const token = "1e1c5814b47ecd941f8aea8d8520ef";
    const client = new SiteClient(token);
    const recordCreated = await client.items.create({
      itemType: "972624", // ID DO MODEL
      ...req.body,
      //title: "Comunidade Teste",
      //imageUrl: "https://github.com/LarisseLima.png",
      //creatorSlug: "LarisseLima"
    });
    res.json({
      data: "Dados",
      recordCreated: recordCreated,
    });
    return;
  }
  res.status(404).json({
    message: "Ainda não há nada no GET, somente no POST",
  });
}
