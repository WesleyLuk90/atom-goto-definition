'use babel';

import GoToDefinition from '../lib/goto-definition';

describe('GoToDefinition', () => {
    it('should get ignored paths', () => {
        atom.config.set('goto-definition.ignoreFolders', 'a, b, c')
        expect(GoToDefinition.getIgnoredPathsGlob()).toEqual(['!a', '!b', '!c']);
    });
});
