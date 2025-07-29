import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Heart, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { log } from '../utils/helpers';


import { Pencil, Reply, Trash } from 'lucide-react';


const Comment = ({ comment, replies, postId, onReplySubmit, onRefresh }) => {
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    await onReplySubmit(postId, replyText, comment.id);
    setReplyText('');
    setShowReply(false);
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`${BASE_URL}/comments/${comment.id}`, {
        content: editText,
      }, { withCredentials: true });
      setIsEditing(false);
      onRefresh();
    } catch (err) {
      console.error('Edit failed', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/comments/${comment.id}`, { withCredentials: true });
      onRefresh();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="ml-4 mt-3">
      <div className="bg-base-200 p-3 rounded-lg text-sm shadow-sm space-y-1">
        {/* First Line: Author, Time, Actions */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">{comment.author}</span>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <span>{moment(comment.created_at).fromNow()}</span>
            <button onClick={() => setIsEditing(!isEditing)} className="hover:text-blue-600">
              <Pencil size={16} />
            </button>
            <button onClick={() => setShowReply(!showReply)} className="hover:text-green-600">
              <Reply size={16} />
            </button>
            <button onClick={handleDelete} className="hover:text-red-600">
              <Trash size={16} />
            </button>
          </div>
        </div>

        {/* Second Line: Content or Edit TextArea */}
        {isEditing ? (
          <>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={2}
            />
            <button className="btn btn-xs btn-success mt-1" onClick={handleEdit}>Save</button>
          </>
        ) : (
          <p className="text-gray-700">{comment.content}</p>
        )}

        {/* Reply Box */}
        {showReply && (
          <div className="mt-2">
            <textarea
              className="textarea textarea-bordered w-full"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
            />
            <button className="btn btn-primary btn-sm mt-1" onClick={handleReply}>Reply</button>
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {replies?.map(reply => (
        <Comment
          key={reply.id}
          comment={reply}
          replies={reply.replies}
          postId={postId}
          onReplySubmit={onReplySubmit}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};





const PostCard = (post) => {
    console.log(post)
    const { user_id: userId,post_id:postId, author, content, created_at } = post;
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [showComments, setShowComments] = useState(false);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/comments/${postId}`);
            setComments(buildNestedComments(res.data.comments));
        } catch (err) {
            console.error("Error loading comments", err);
        }
    };

    useEffect(() => {
        if (showComments) fetchComments();
    }, [showComments]);

    const buildNestedComments = (flatComments) => {
        const map = {};
        const roots = [];

        flatComments.forEach(c => (map[c.id] = { ...c, replies: [] }));
        flatComments.forEach(c => {
            if (c.parent_comment_id) {
                map[c.parent_comment_id]?.replies.push(map[c.id]);
            } else {
                roots.push(map[c.id]);
            }
        });

        return roots;
    };

    const handlePostComment = async () => {
      console.log(postId)
        if (!text.trim()) return;
        try {
            await axios.post(`${BASE_URL}/comments`, {
                post_id: postId,
                content: text,
            }, { withCredentials: true });
            setText('');
            fetchComments();
        } catch (err) {
            console.error("Failed to post comment", err);
        }
    };

    const handleReplySubmit = async (postId, replyText, parentId) => {
        try {
            await axios.post(`${BASE_URL}/comments`, {
                post_id: postId,
                content: replyText,
                parent_comment_id: parentId,
            }, { withCredentials: true });
            fetchComments();
        } catch (err) {
            console.error("Reply failed", err);
        }
    };

    return (
        <div className="card shadow-md bg-base-100 w-full max-w-xl mx-auto mb-6">
            <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={post.photo_url || 'https://placehold.co/100x100'} alt="User" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">{author}</h2>
                        <p className="text-sm text-gray-500">
                            {moment(created_at).format('MMMM Do YYYY, h:mm A')}
                        </p>
                    </div>
                </div>

                <p className="text-base text-gray-700">{content}</p>

                <div className="mt-4 flex gap-6">
                    <button className="btn btn-ghost btn-sm flex items-center gap-1 text-red-500">
                        <Heart size={18} />
                        <span>{post.likes || 0}</span>
                    </button>
                    <button className="btn btn-ghost btn-sm flex items-center gap-1 text-blue-500" onClick={() => setShowComments(prev => !prev)}>
                        <MessageCircle size={18} />
                        <span>{comments.length}</span>
                    </button>
                </div>

                {showComments && (
                    <div className="mt-4">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Add a comment..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button className="btn btn-primary mt-2" onClick={handlePostComment}>
                            Post Comment
                        </button>

                        <div className="mt-4">
                            {comments.map(comment => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    replies={comment.replies}
                                    postId={postId}
                                    onReplySubmit={handleReplySubmit}
                                    onRefresh={fetchComments}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;


