# Unity Images Dataset

All images are validated and must be:

- PNG with a size of 400x400px
- <lowercased address>.png

## Usage

```bash
git add .
git commit -m "Update dataset"
git push
```

You will see a response like this

```
> images@1.0.0 validate
> node validate.mjs

Validating images

Processing folder: 250
✔ 0x01e77288b38b416f972428d562454fb329350bac.png is valid
✔ 0x3fd3a0c85b70754efc07ac9ac0cbbdce664865a6.png is valid
Processing folder: 42161
Processing folder: 8453
```
