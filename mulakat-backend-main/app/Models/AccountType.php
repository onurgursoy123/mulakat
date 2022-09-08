<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountType extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
    public function banks()
    {
        return $this->belongsToMany(Bank::class, 'banks_interests', 'account_type', 'bank_id');
    }
    public function banks_interests()
    {
        return $this->hasMany(BanksInterests::class, 'account_type');
    }
    public function credits_max_amount()
    {
        return $this->hasMany(CreditsMaxAmount::class, 'account_type');
    }
}
