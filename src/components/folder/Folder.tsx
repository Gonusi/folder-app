import React, { useState } from 'react';
import classNames from 'classnames';
import config from '../../config';
import folderImageEmpty from '../../assets/folderEmpty.svg';
import folderImageFull from '../../assets/folderFull.svg';
import styles from './Folder.module.scss';

interface Props {
	hasChildren: boolean;
	id: string;
	isSelected: boolean;
	name: string;
	onOpen: (id: string) => void;
	onSelect: (id: string) => void;
}

const Folder = ({ onOpen, onSelect, id, name, hasChildren, isSelected }: Props) => {
	const [lastClickDate, setLastClickDate] = useState();
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleClick = () => {
		const currentClickDate = Date.now();
		if (currentClickDate - lastClickDate < config.doubleClickIntervalMs) {
			onOpen(id);
		} else {
			onSelect(id);
		}
		setLastClickDate(currentClickDate);
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.content}
				data-no-deselect
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				title={name}
			>
				<img
					alt="Folder"
					src={hasChildren ? folderImageFull : folderImageEmpty}
					data-no-deselect
					className={classNames(styles.icon, {
						[styles.selected]: isSelected,
						[styles.hover]: isHovered
					})}
				/>
				<div
					className={classNames(styles.label, { [styles.selected]: isSelected })}
					data-no-deselect
				>
					{name}
				</div>
			</div>
		</div>
	);
};

export default Folder;
