import { useEffect, useState } from 'react';
import { FileSystem } from '../fileSystem';

export function getPathToId(
	fileSystem: FileSystem,
	rootFolderId: string,
	id: string,
	path: string[] = []
): string[] | Function {
	if (id === rootFolderId) {
		return [rootFolderId, ...path];
	}
	return getPathToId(fileSystem, rootFolderId, fileSystem[id].parent!, [id, ...path]);
}

const useWindowWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	});

	return width;
};

export default useWindowWidth;
