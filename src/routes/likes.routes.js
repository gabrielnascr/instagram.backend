import { Router } from "express";
import LikeService from "../services/LikeService";

const router = Router();

router.post("/:photoId/like", async (req, res) => {
  const { photoId } = req.params;

  await LikeService.likePhoto(photoId, req.user.id).then(() => {
    return res.status(200).send({ message: "SUCCESS" });
  });
});

router.post("/:photoId/unlike", async (req, res) => {
  const { photoId } = req.params;

  await LikeService.unLikePhoto(photoId).then(() => {
    return res.status(200).send({ message: "SUCCESS" });
  });
});

export default router;
