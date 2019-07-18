import React from 'react';
import * as validate from '../../helpers/validate';
import Button from '../button/Button';
import { ButtonStyle } from '../button/Button';
import styles from './CreateFolderDialog.module.scss';

interface Props {
	onCreate: (folderName: string) => void;
	onCancel: () => void;
}

interface State {
	name: string;
	validationError?: string;
}

class CreateFolderDialog extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: 'Untitled folder',
			validationError: undefined
		};
	}

	handleNameChange = ({ target: { value } }: React.BaseSyntheticEvent) => {
		if (this.state.validationError && !validate.required(value)) {
			this.setState({ validationError: undefined });
		}
		this.setState({ name: value });
	};

	handleCreate = () => {
		const { name } = this.state;
		const validationResponse = validate.required(name);
		if (!validationResponse) {
			this.props.onCreate(name);
		} else {
			this.setState({ validationError: validationResponse });
		}
	};

	handleKeyDown = ({ key }: React.KeyboardEvent) => {
		switch (key) {
			case 'Enter':
				this.handleCreate();
				break;
			case 'Escape':
				this.props.onCancel();
		}
	};

	render() {
		const { name, validationError } = this.state;
		return (
			<div className={styles.container} onKeyDown={this.handleKeyDown}>
				<div className={styles.content}>
					<div className={styles.header}>New Folder</div>
					<div className={styles.form}>
						<div className={styles.inputContainer}>
							<input
								className={styles.input}
								autoFocus
								type="text"
								onChange={this.handleNameChange}
								value={name}
								onFocus={event => event.target.select()}
							/>
							{validationError && (
								<div className={styles.validationError}>{validationError}</div>
							)}
						</div>
						<div className={styles.buttonContainer}>
							<Button className={styles.button} onClick={this.handleCreate}>
								Create
							</Button>
							<Button
								className={styles.button}
								onClick={() => this.props.onCancel()}
								buttonStyle={ButtonStyle.secondary}
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateFolderDialog;
