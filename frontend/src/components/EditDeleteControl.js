import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Popup, Button, Modal, Icon } from 'semantic-ui-react'

class EditDeleteControl extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    deleteWarningTitle: PropTypes.string,
    deleteWarningDescription: PropTypes.string,
    icon: PropTypes.string
  }

  static defaultProps = {
    deleteWarningTitle: 'Are you sure?',
    deleteWarningDescription: 'This action cannot be undone.  Any deletes will be permanent.',
    icon: 'ellipsis vertical'
  }

  state = {
    isShowingDeleteModal: false,
  }

  showDelete = () => this.setState({ isShowingDeleteModal: true })
  hideDelete = () => this.setState({ isShowingDeleteModal: false })

  handleDelete = () => {
    this.props.onDelete()
    this.hideDelete()
  }


  render() {
    const { onEdit, deleteWarningTitle, deleteWarningDescription, icon } = this.props
    const { isShowingDeleteModal } = this.state

    return <div>
      <Popup
        trigger={<Icon name={icon} />}
        hoverable>
        <Button icon='edit' content='Edit' onClick={onEdit} />
        <Button icon='trash' negative content='Delete' onClick={this.showDelete} />
      </Popup>

      <Modal open={ isShowingDeleteModal }
             size='mini'
             header={deleteWarningTitle}
             description={deleteWarningDescription}
             actions={[
               <Button icon='cancel' content='Cancel' onClick={this.hideDelete} key='cancel' />,
               <Button negative icon='trash' content='Delete' onClick={this.handleDelete} key='delete' />
             ]}
      />
    </div>
  }
}

export default EditDeleteControl