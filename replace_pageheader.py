import os, glob

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    content = content.replace("import PageHeader from '@/components/PageHeader.vue'", "import PageHeader2 from '@/components/PageHeader2.vue'")
    content = content.replace("<PageHeader ", "<PageHeader2 ")
    content = content.replace("<PageHeader\n", "<PageHeader2\n")
    content = content.replace("<PageHeader\r", "<PageHeader2\r")
    content = content.replace("<PageHeader>", "<PageHeader2>")
    content = content.replace("</PageHeader>", "</PageHeader2>")
    
    # Options API components
    content = content.replace("components: { PageHeader", "components: { PageHeader2")
    content = content.replace("components: {\n    PageHeader", "components: {\n    PageHeader2")
    content = content.replace("components: {PageHeader", "components: {PageHeader2")

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src/'):
    for file in files:
        if file.endswith('.vue'):
            replace_in_file(os.path.join(root, file))

