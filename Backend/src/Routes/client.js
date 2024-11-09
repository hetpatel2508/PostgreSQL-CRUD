import { Router } from "express";
import { createClient, deleteClient, fetchClient, searchClient, searchClientByName, updateClient }  from "../Controllers/client.js";


const router = Router();

// router.get("/", (req, res) => {
//     res.json({ message: "Hello World" });
// });

        //or

router.route("/").get(fetchClient);

router.post("/", createClient); 

// router.put("/:id", updateClient);
router.route("/:id")
        .put(updateClient)
        .delete(deleteClient)
        .get(searchClient);

router.get("/search/:name", searchClientByName);

export default router;