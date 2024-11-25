export const standard = defineScenario({
  audit: {
    one: {
      data: {
        log: 'String',
        user: { create: { email: 'String90102', loginToken: 'String' } },
      },
    },
    two: {
      data: {
        log: 'String',
        user: { create: { email: 'String3725025', loginToken: 'String' } },
      },
    },
  },
})
