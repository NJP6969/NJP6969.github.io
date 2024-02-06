
document.querySelectorAll('.blog').forEach(blog => {
    const blogId = blog.id;
    const likeButton = blog.querySelector('.like-button');
    const commentButton = blog.querySelector('.comment-button');

    const likes = localStorage.getItem(blogId + '-likes') || 0;
    const comments = JSON.parse(localStorage.getItem(blogId + '-comments')) || [];

    blog.querySelector('.like-counter').textContent = likes + ' likes';
    blog.querySelector('.comments-section').innerHTML = comments.join('<br>');

    likeButton.addEventListener('click', () => {
        const newLikes = Number(likes) + 1;
        localStorage.setItem(blogId + '-likes', newLikes);
        blog.querySelector('.like-counter').textContent = newLikes + ' likes';
    });

    commentButton.addEventListener('click', () => {
        const commentInput = blog.querySelector('.comment-input');
        const newComment = commentInput.value;
        if (newComment) {
            comments.push(newComment);
            localStorage.setItem(blogId + '-comments', JSON.stringify(comments));
            blog.querySelector('.comments-section').innerHTML += newComment + '<br>';
            commentInput.value = '';
        }
    });
});