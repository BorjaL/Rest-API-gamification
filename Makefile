test:
	@./node_modules/.bin/mocha -R spec --ui tdd -c

.PHONY: test