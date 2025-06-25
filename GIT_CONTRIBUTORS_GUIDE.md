# 🔧 Adding Contributors via Git Commands

## If you have teammates who helped with the code:

### **Method 1: Add Co-authors to Commits**
```bash
# When committing with multiple contributors:
git commit -m "🎨 Add amazing feature

Co-authored-by: Teammate Name <teammate@email.com>
Co-authored-by: Another Contributor <contributor@email.com>"
```

### **Method 2: Update Author Information**
```bash
# If someone else wrote code but you committed it:
git commit --author="Contributor Name <contributor@email.com>" -m "🚀 Add their contribution"
```

### **Method 3: Amend Last Commit with Co-authors**
```bash
# Add co-authors to the most recent commit:
git commit --amend -m "🎨 Previous commit message

Co-authored-by: Teammate Name <teammate@email.com>"
```

### **Method 4: Interactive Rebase (Advanced)**
```bash
# Change author of previous commits:
git rebase -i HEAD~3  # Edit last 3 commits
# Change 'pick' to 'edit' for commits to modify
# Then for each commit:
git commit --amend --author="New Author <email@example.com>"
git rebase --continue
```

## 📊 View Contributors
```bash
# See all contributors:
git shortlog -sn

# See detailed contribution stats:
git log --pretty=format:"%h - %an, %ar : %s"
```
