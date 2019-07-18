import React from 'react';
import generateUUID from 'uuid/v4';
import { UnregisterCallback } from 'history';
import config from './config';
import history from './helpers/history';
import emptyFileSystem, { FileSystem, FileSystemEntity } from './fileSystem';
import CreateFolderDialog from './components/createFolderDialog/CreateFolderDialog';
import Header from './components/header/Header';
import Folder from './components/folder/Folder';
import Button, { ButtonStyle } from './components/button/Button';
import styles from './App.module.scss';

const LOCAL_STORAGE_KEY = 'seb_task-fileSystem_v1';

interface State {
	fileSystem: { [id: string]: FileSystemEntity };
	currentFolderId: string;
	selectedFolderId?: string;
	isFolderCreateDialogVisible: boolean;
	filter: string;
	removeHistoryListener?: UnregisterCallback;
}

class App extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		const fileSystem = this.loadFileSystem();
		this.state = {
			fileSystem,
			currentFolderId: this.getCurrentFolderId(fileSystem),
			isFolderCreateDialogVisible: false,
			filter: ''
		};
	}

	componentDidMount() {
		const removeHistoryListener = history.listen((location, action) => {
			this.setState({
				currentFolderId: this.getCurrentFolderId(this.state.fileSystem)
			});
		});
		this.setState({
			removeHistoryListener
		});
	}

	componentWillUnmount() {
		const { removeHistoryListener } = this.state;
		if (removeHistoryListener) {
			removeHistoryListener();
		}
	}

	loadFileSystem = () => {
		const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (localStorageData) {
			try {
				return JSON.parse(localStorageData);
			} catch (e) {
				return emptyFileSystem;
			}
		}
		return emptyFileSystem;
	};

	getCurrentFolderId = (fileSystem: FileSystem) => {
		const path = history.location.pathname.substring(1);
		if (fileSystem[path] === undefined) {
			return config.rootFolderId;
		}
		return path;
	};

	changeFolder = (id: string) => {
		history.push(id === config.rootFolderId ? '/' : id);
	};

	createFolder = (name: string) => {
		const { fileSystem, currentFolderId } = this.state;
		const newFolder: FileSystemEntity = {
			id: generateUUID(),
			name,
			children: [],
			parent: this.state.currentFolderId
		};

		const updatedFileSystem = { ...fileSystem };
		updatedFileSystem[currentFolderId].children.push(newFolder.id);

		this.setState(
			(prevState: State) => ({
				isFolderCreateDialogVisible: false,
				fileSystem: {
					...updatedFileSystem,
					[newFolder.id]: newFolder
				}
			}),
			() => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.fileSystem))
		);
	};

	clearFileSystem = () => {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		history.push('/')
		this.setState({
			fileSystem: emptyFileSystem
		});
	};

	handleClick = ({ target }: React.BaseSyntheticEvent) => {
		if (!target.getAttribute('data-no-deselect')) {
			this.setState({ selectedFolderId: undefined });
		}
	};

	handleFolderSelect = (id: string) => {
		this.setState({
			selectedFolderId: id
		});
	};

	handleFolderCreateClick = () => {
		this.setState({
			isFolderCreateDialogVisible: true
		});
	};

	handleFolderCreateCancel = () => {
		this.setState({
			isFolderCreateDialogVisible: false
		});
	};

	setFilter = (value: string) => {
		this.setState({
			filter: value
		});
	};

	render() {
		const {
			currentFolderId,
			fileSystem,
			filter,
			isFolderCreateDialogVisible,
			selectedFolderId
		} = this.state;
		return (
			<>
				<div className={styles.container} onClick={this.handleClick} tabIndex={0}>
					<Header
						currentFolderId={currentFolderId}
						fileSystem={fileSystem}
						filter={filter}
						onFilterChange={this.setFilter}
						onFolderCreateClick={this.handleFolderCreateClick}
						onFolderOpen={this.changeFolder}
						selectedFolderId={selectedFolderId}
					/>
					<div className={styles.content}>
						{Object.values(fileSystem)
							.filter(
								({ parent, name }) =>
									currentFolderId === parent &&
									name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
							)
							.map(({ id, name, children }) => (
								<Folder
									hasChildren={children.length > 0}
									id={id}
									isSelected={selectedFolderId === id}
									key={id}
									name={name}
									onOpen={this.changeFolder}
									onSelect={this.handleFolderSelect}
								/>
							))}
					</div>
					<footer className={styles.footer}>
						<Button
							buttonStyle={ButtonStyle.dangerous}
							className={styles.clearButton}
							onClick={this.clearFileSystem}
						>
							Clear file system
						</Button>
					</footer>
				</div>
				{isFolderCreateDialogVisible && (
					<CreateFolderDialog
						onCreate={this.createFolder}
						onCancel={this.handleFolderCreateCancel}
					/>
				)}
			</>
		);
	}
}

export default App;
