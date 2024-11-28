import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const BookForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.book?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.book?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="author"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author
        </Label>

        <TextField
          name="author"
          defaultValue={props.book?.author}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="author" className="rw-field-error" />

        <Label
          name="isbn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Isbn
        </Label>

        <TextField
          name="isbn"
          defaultValue={props.book?.isbn}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isbn" className="rw-field-error" />

        <Label
          name="bookNotes"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Book notes
        </Label>

        <TextField
          name="bookNotes"
          defaultValue={props.book?.bookNotes}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="bookNotes" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookForm
