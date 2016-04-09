import { Router } from 'express';
import * as controller from '../controllers/snippet.controller';
const router = new Router();

// Get all Posts
router.route('/').get(controller.getSnippets);

// Add a new Post
router.route('/').post(controller.addSnippet);

// router.route('/:snippet_id').delete(PostController.deleteSnippet);

export default router;
