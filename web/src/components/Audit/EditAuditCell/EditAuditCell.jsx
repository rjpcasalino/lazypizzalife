import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AuditForm from 'src/components/Audit/AuditForm'

export const QUERY = gql`
  query EditAuditById($id: String!) {
    audit: audit(id: $id) {
      id
      createdAt
      updatedAt
      userId
      log
    }
  }
`

const UPDATE_AUDIT_MUTATION = gql`
  mutation UpdateAuditMutation($id: String!, $input: UpdateAuditInput!) {
    updateAudit(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      userId
      log
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ audit }) => {
  const [updateAudit, { loading, error }] = useMutation(UPDATE_AUDIT_MUTATION, {
    onCompleted: () => {
      toast.success('Audit updated')
      navigate(routes.audits())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateAudit({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Audit {audit?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AuditForm
          audit={audit}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
