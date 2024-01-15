import { Component } from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  comments: any;
  newComment: { content: string, rate: number } = { content: '', rate: 1 };

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  getEmptyStars(comment: any): number[] {
    return Array.from({ length: comment.rate }, (_, index) => index);
  }

  async loadComments() {
    try {
      console.log('Fetching comments...');
      this.comments = await this.commentService.getComments();
      this.comments.reverse();
      console.log('Comments:', this.comments);
    } catch (error) {
      console.log('Error fetching comments:', error);
    }
  }

  submitFeedback() {
    this.commentService.createComment(this.newComment).then(() => {
        // Clear the form after submission
        this.newComment = { content: '', rate: 1 };
        // Reload the comments to display the new one
        this.loadComments();
      },
      (error) => {
        this.newComment = { content: '', rate: 1 };
        this.loadComments();
      }
    );
  }
}
