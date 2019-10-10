module.exports = {
    newInputTodo() {
        return (/*html*/`
            <div class='new-todo-wrapper'>
                <form>
                    <div class='input-area-wrapper'>
                        <input type='text' name='new-todo-title'>
                        <textarea name='new-todo-content'></textarea>
                    </div>
                    <div class='input-files-wrapper'>
                        <input type='file' name='new-todo-files' multiple>
                    </div>
                    <div class='new-todo-btns'>
                        <input type='submit' class='add-btn' value='Add'>
                        <input type='reset' class='cancel-btn' value='Cancel'>
                    </div>
                </form>
            </div>
        `);
    }
}