<div class="container">
    <a href="/register">Tạo tài khoản</a>
    </br>
    <a href="/noti/manage">Quản lý thông báo</a>
    </br>
    <a href="/profile/password">Đổi mật khẩu</a>
    </br>
    <a href="/test">Test api</a>
    
    <form action="/api/posts/" id="formCreatePost">
        <h3>Create Post</h3>
        <div class="mb-3">
            <label class="form-label">Content</label>
            <input type="text" class="form-control" name="content">
        </div>
    
        <div class="mb-3">
            <label class="form-label">URL Youtube:</label>
            <input type="text" class="form-control" name="video">
        </div>
    
        <div class="mb-3">
            <label class="form-label">Content</label>
            <input type="file" class="form-control" id="imagePost" name="imagePost">
        </div>
    
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <form action="/api/posts/" id="formUpdatePost">
        <h3>Update Post</h3>
        <div class="mb-3">
            <label class="form-label">Content</label>
            <input type="text" class="form-control" name="content">
        </div>
    
        <div class="mb-3">
            <label class="form-label">URL Youtube:</label>
            <input type="text" class="form-control" name="video">
        </div>
    
        <div class="mb-3">
            <label class="form-label">Content</label>
            <input type="file" class="form-control" id="imagePost" name="imagePost">
        </div>
    
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <form action="/api/posts/" id="formCommentPost">
        <h3>Create Post</h3>
        <div class="mb-3">
            <label class="form-label">Content</label>
            <input type="text" class="form-control" name="content">
        </div>
    
        <div class="mb-3">
            <label class="form-label">URL Youtube:</label>
            <input type="text" class="form-control" name="video">
        </div>
    
        <div class="mb-3">
            <label class="form-label">Content</label>
            <input type="file" class="form-control" id="imagePost" name="imagePost">
        </div>
    
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>