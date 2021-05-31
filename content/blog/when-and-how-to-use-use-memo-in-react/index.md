---
title: When and how to use useMemo in React
date: "2021-05-28T18:00:00Z"
description: "useMemo can help optimize performance if you're making expensive calculations."
---

React's `useMemo` hook can be a helpful tool for optimizing the performance of
React components. 

Here's what the [React
docs](https://reactjs.org/docs/hooks-reference.html#usememo) have to say about
`useMemo`:

> Pass a “create” function and an array of dependencies. useMemo will only
> recompute the memoized value when one of the dependencies has changed. This
> optimization helps to avoid expensive calculations on every render.

What does this mean in the context of an actual React component? Let's imagine
we have some value that requires an expensive calculation to determine.

```typescript
const someValue = doSomeExpensiveCalculation(a, b)
```

By default, React will recompute `someValue` every time the component rerenders,
*even if the none of its dependencies have changed*.

This could result the UI being slow or laggy. To solve this problem, we can use
`useMemo` like this:

```typescript
const someValue = useMemo(() => {
    doSomeExpensiveCalculation(a, b)
}, [a, b])
```

`useMemo` takes two arguments: a function to compute the value and a dependency
array. Using `useMemo` in this way will ensure that `someValue` is only
recomputed if one the dependencies (`a` or `b`) changes.

I'd also recommend using the [ESLint plugin for React
Hooks](https://reactjs.org/docs/hooks-rules.html#eslint-plugin) to ensure your
dependency array contains each value referenced by the function. Otherwise, you
might encounter some strange or unexepcted behavior.
