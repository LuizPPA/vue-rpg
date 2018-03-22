import { master } from '../main'
var dices = require('./dices')

export default {
  potion(data){
    if (data.player.hp >= data.player.maxHp) {
      data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
    }
    else{
      let gain = 20
      data.logs.unshift(data.player.name+' uses a potion restoring '+gain+' HP!')
      if (data.player.hp + gain > data.player.maxHp) {
        data.player.hp = data.player.maxHp
      }
      else{
        data.player.hp += gain
      }
    }
  },

  hiPotion(data){
    if (data.player.hp >= data.player.maxHp) {
      data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
    }
    else{
      let gain = 32
      data.logs.unshift(data.player.name+' uses a hi-potion restoring '+gain+' HP!')
      if (data.player.hp + gain > data.player.maxHp) {
        data.player.hp = data.player.maxHp
      }
      else{
        data.player.hp += gain
      }
    }
  },

  silverShuriken(data){
    if (data.enemy.hp <= 0) {
      data.logs.unshift(data.player.name+' uses silver shuriken but '+data.enemy.name+' was already dead!')
    }
    else{
      let damage
      if (data.enemy.weakness === 2) {
        damage = 12+dices.d20()
      }
      else{
        damage = 6+dices.d8()
      }
      data.logs.unshift(data.player.name+' uses a silver shuriken dealing dealing a damage of '+damage+'!')
      if (data.enemy.hp > damage) {
        data.enemy.hp -= damage
      }
      else{
        data.enemy.hp = 0
        master.$emit('enemyDefeated')
      }
    }
  },

  iceMagicite(data){
    if (data.enemy.hp <= 0) {
      data.logs.unshift(data.player.name+' uses ice magicite but '+data.enemy.name+' was already dead!')
    }
    else{
      let damage
      if (data.enemy.weakness === 3) {
        damage = 15+dices.d10()+dices.d10()
      }
      else{
        damage = 5+dices.d10()
      }
      data.logs.unshift(data.player.name+' uses an ice magicite dealing a damage of '+damage+'!')
      if (data.enemy.hp > damage) {
        data.enemy.hp -= damage
      }
      else{
        data.enemy.hp = 0
        master.$emit('enemyDefeated')
      }
    }
  },

  behemothSkin(data){
    data.player.ca += 2
    data.logs.unshift(data.player.name+' is now wearing the Behemoth Skin!')
  },

  lifeStone(data){
    data.player.hp = data.player.maxHp
    data.logs.unshift(data.player.name+' used a Life Stone restoring his full health!')
  },

  orchrishBlade(data){
    data.player.damage = function() {return dices.d10()+dices.d10()}
    data.logs.unshift(data.player.name+' is now using an orchrish blade!')
  },

  phoenixDown(data){
    if (data.player.hp === 0) {
      data.player.hp = 100
      data.logs.unshift('Its a miracle! '+data.player.name+' is back to life!')
    }
    else {
      data.logs.unshift(data.player.name+' tried to use Phoenix Down but he miss!')
    }
  }
}
