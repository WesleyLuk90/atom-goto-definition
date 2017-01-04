'use babel';

import GoToDefinition from '../lib/goto-definition';

describe('GoToDefinition', () => {
    beforeEach(() => {
        atom.config.set('goto-definition.ignoreFolders', 'a, b, c')
    });
    it('should get ignored paths', () => {
        expect(GoToDefinition.getIgnoredPathsGlob()).toEqual(['!a', '!b', '!c']);
    });
    it('should find angular directives', () => {
        spyOn(atom.workspace, 'scan').andReturn(Promise.resolve());
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn({
            getPath: () => '/some/path.html',
        });
        GoToDefinition.go({ text: 'my-directive' });
        expect(atom.workspace.scan).toHaveBeenCalled();
        const regex = atom.workspace.scan.calls[0].args[0];
        expect('.directive("myDirective", function())').toMatch(regex);
        expect('.directive(\'myDirective\', function())').toMatch(regex);
    });
});
