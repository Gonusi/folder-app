import React from 'react';
import classNames from 'classnames';
import { getPathToId } from '../../helpers/helpers';
import Button, { ButtonStyle } from '../button/Button';
import config from '../../config';
import clearIcon from '../../assets/clear.svg';
import { FileSystem } from '../../fileSystem';
import styles from './Header.module.scss';

interface Props {
	currentFolderId: string;
	fileSystem: FileSystem;
	filter: string;
	onFilterChange: (value: string) => void;
	onFolderCreateClick: () => void;
	onFolderOpen: (id: string) => void;
	selectedFolderId?: string;
}

const Header = ({
	currentFolderId,
	fileSystem,
	filter,
	onFilterChange,
	onFolderCreateClick,
	onFolderOpen,
	selectedFolderId
}: Props) => {
	const currentFolderParentId = fileSystem[currentFolderId].parent;

	const handleKeyDown = ({ key }: React.KeyboardEvent) => {
		if (key === 'Escape') onFilterChange('');
	};

	return (
		<header className={styles.container}>
			<div className={styles.pathContainer}>
				{(getPathToId(fileSystem, config.rootFolderId, currentFolderId) as string[]).map(
					id => (
						<span
							className={styles.pathSegment}
							id={id}
							key={id}
							onClick={() => onFolderOpen(id)}
						>
							{fileSystem[id].name}
						</span>
					)
				)}
			</div>
			<div className={styles.inputContainer}>
				<input
					className={styles.input}
					id="filterInput"
					onChange={({ target: { value } }) => onFilterChange(value)}
					onKeyDown={handleKeyDown}
					placeholder="Filter..."
					title="Filter currently visible folders by full or partial name"
					type="text"
					value={filter}
				/>
				{filter && (
					<div className={styles.clearInputButton} onClick={() => onFilterChange('')}>
						<img
							alt="Clear icon"
							className={styles.clearInputButtonImage}
							src={clearIcon}
							title="Clear filter (Esc)"
						/>
					</div>
				)}
			</div>
			<Button
				className={classNames(styles.button, styles.openParentFolderButton)}
				buttonStyle={ButtonStyle.secondary}
				disabled={currentFolderParentId === undefined}
				onClick={() => onFolderOpen(currentFolderParentId!)}
				title={
					currentFolderParentId === undefined
						? 'You are in the root folder'
						: 'Open parent folder'
				}
			>
				↥
			</Button>
			<Button
				className={classNames(styles.newFolderButton, styles.button)}
				onClick={onFolderCreateClick}
			>
				New Folder
			</Button>
		</header>
	);
};

export default Header;
