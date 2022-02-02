## Switching Python verison for development

Possibly needed as some issues were there for new verisons of Python 3.10.0+

## Linux Solution
Install `pyenv`

add the following to .bashrc, .zshrc or profile.

```
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi
eval "$(pyenv virtualenv-init -)"
```

Run `exec "$SHELL"`

Run `pyenv install -v 3.9.9`

Run `pyenv global 3.9.9`

create a virtual enviornment using `pyenv virtualenv 3.9.9 venv`

Activate your venv, `pyenv activate venv`
