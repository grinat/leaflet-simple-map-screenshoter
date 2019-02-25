workflow "Build, test, publish" {
  on = "push"
  resolves = ["Publish in npm"]
}

action "Install" {
  uses = "ianwalter/puppeteer@v1.0.0"
  runs = "npm"
  args = "install"
}

action "Testing" {
  uses = "ianwalter/puppeteer@v1.0.0"
  needs = ["Install"]
  runs = "npm"
  args = "run test"
}

action "master filter" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  needs = ["Testing"]
  args = "branch master"
}

action "Publish in npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["master filter"]
  secrets = ["NPM_AUTH_TOKEN"]
  args = "publish --access public"
}
