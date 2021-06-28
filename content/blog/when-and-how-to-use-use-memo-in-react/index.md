---
title: When and how to use useMemo in React
date: "2021-05-28T18:00:00Z"
description: "useMemo can help us optimize performance when making expensive calculations."
---

React's `useMemo` hook can be a helpful tool for optimizing the performance of
React components when making expensive calculations.

Here's what the [React
docs](https://reactjs.org/docs/hooks-reference.html#usememo) have to say about
`useMemo`:

> Pass a “create” function and an array of dependencies. useMemo will only
> recompute the memoized value when one of the dependencies has changed. This
> optimization helps to avoid expensive calculations on every render.

What does this mean in the context of an actual React component? Let's imagine
we have some value that requires an expensive calculation to determine: for
example, mapping over a large array.

```typescript
const someValue = doSomeExpensiveCalculation(a, b)
```

By default, React will recompute `someValue` every time the component rerenders,
**even if none of its dependencies change**.

These unnecessary expensive computations could make our UI laggy. This is where
`useMemo` comes in: 

```typescript
const someValue = useMemo(
  () => doSomeExpensiveCalculation(a, b),
  [a, b]
)
```

`useMemo` takes two arguments: the (expensive) function that computes the value
and a dependency array. Using `useMemo` like this will ensure that `someValue`
is only recomputed when one of its dependencies (`a` or `b`) changes.

I'd also recommend using this [ESLint plugin for React
Hooks](https://reactjs.org/docs/hooks-rules.html#eslint-plugin) to ensure your
dependency array contains each value referenced by the function. Otherwise, you
might encounter some strange or unexpected behavior.
