import character from "../models/character.js";

const patch = (a, b) => {
    for(let key in b) {
        if(!a[key]) a[key] = b[key];
        if(typeof(a[key]) == 'object') {
            patch(a[key], b[key]);
        }
    }
}

const suffix = 'wildcard';

export default {
    delete: (model) => {
        if(!confirm(`Delete ${model.name}?`)) return;

        localStorage.removeItem(`${model.name}.${suffix}`);
        return { success: `${model.name} deleted from character storage` };
    },
    deleteAll: () => {
        if(!confirm('Delete all saved characters?')) return;
        let characters = [...new Array(window.localStorage.length)].map((x,i) => window.localStorage.key(i));
        characters = characters.filter(c => c.endsWith(`.${suffix}`));
        characters.forEach(c => localStorage.removeItem(c));
        return { success: 'All characters deleted from character storage' };
    },
    export: (model) => {
        let href = URL.createObjectURL(new Blob([JSON.stringify(model)]));
        let a = document.createElement('a');
        a.href = href;
        a.download = `${model.name}.${suffix}`;
        a.click();
    },
    import: (done) => {
        let file = document.createElement('input');
        file.type = 'file';
        file.accept = `.${suffix}`;
        file.onchange = (e) => {
            e.target.files[0].text().then((t) => {
                let key = JSON.parse(t).name;
                localStorage.setItem(`${key}.${suffix}`, t);
                done(`${key} added to character storage`);
            });
        };
        file.click();
    },
    load: (model, key) => {
        let name = key;
        if(name == `${model.name}.${suffix}`) return { model };

        let alert = '';
        if(model.name && confirm(`Save ${model.name} before changing characters?`)) {
            localStorage.setItem(model.name, JSON.stringify(model));
            alert += `${model.name} saved, `;
        }

        model = JSON.parse(localStorage.getItem(name));
        
        patch(model, character());
        return { model, alert: { success: `${alert}${model.name} opened` }};
    },
    loadList: () => {
        let characters = [...new Array(window.localStorage.length)].map((x,i) => window.localStorage.key(i));
        characters = characters.filter(c => c.endsWith(`.${suffix}`));
        characters.sort((a,b) => a.localeCompare(b));
        return characters;
    },
    save: (model) => {
        if(!model.name)
            return { error: 'Cannot save an unnamed character' };

        localStorage.setItem(`${model.name}.${suffix}`, JSON.stringify(model));
        return { success: `${model.name} saved` };
    }
};
